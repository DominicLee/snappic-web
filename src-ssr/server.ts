import express from 'express';
import compression from 'compression';
import {
  defineSsrClose,
  defineSsrCreate,
  defineSsrListen,
  defineSsrRenderPreloadTag,
  defineSsrServeStaticContent
} from '#q-app/wrappers';
import {ENDPOINTS} from "src/abstract/Settings";
import {SnappicDatabase} from "app/src-ssr/DatabaseService";
import {IRadioStream} from "src/models/interfaces";


export const create = defineSsrCreate((/* { ... } */) => {
  const app = express();

  app.disable('x-powered-by');
  if (process.env.PROD) {
    app.use(compression());
  }

  app.use(express.json());

  const db = new SnappicDatabase('snappic.db');

  app.get(ENDPOINTS.FETCH_STREAMS, async (req, res) => {
    db.getAllStreams().then((streams: IRadioStream) => {
      res.status(200).json(streams)
    })
  })

  app.post(ENDPOINTS.SAVE_STREAM, async (req, res) => {
    const streamToSave = req.body as IRadioStream;
    const saveIntoDatabaseAndReturnId: number = await db.insertStream(streamToSave)
    res.status(201).json(saveIntoDatabaseAndReturnId);
  })

  app.post(ENDPOINTS.UPDATE_STREAM, async (req, res) => {
    const streamToSave = req.body as IRadioStream;
    const updateDatabase: string = await db.updateStream(streamToSave);
    res.status(200).json(updateDatabase);
  })

  app.post(ENDPOINTS.DELETE_STREAM, async (req, res) => {
    const streamUuidToDelete = req.body.uuid as string;
    const deleteStream: string = await db.deleteStreamByUuid(streamUuidToDelete);
    res.status(200).json(deleteStream);
  })

  return app;
});

export const listen = defineSsrListen(({app, devHttpsApp, port}) => {
  const server = devHttpsApp || app;
  return server.listen(port, () => {
    if (process.env.PROD) {
      console.log('Server listening at port ' + port);
    }
  });
});

export const close = defineSsrClose(({listenResult}) => {
  return listenResult.close();
});

const maxAge = process.env.DEV ? 0 : 1000 * 60 * 60 * 24 * 30;

export const serveStaticContent = defineSsrServeStaticContent(({app, resolve}) => {
  return ({urlPath = '/', pathToServe = '.', opts = {}}) => {
    const serveFn = express.static(resolve.public(pathToServe), {maxAge, ...opts});
    app.use(resolve.urlPath(urlPath), serveFn);
  };
});

const jsRE = /\.js$/;
const cssRE = /\.css$/;
const woffRE = /\.woff$/;
const woff2RE = /\.woff2$/;
const gifRE = /\.gif$/;
const jpgRE = /\.jpe?g$/;
const pngRE = /\.png$/;

/**
 * Should return a String with HTML output
 * (if any) for preloading indicated file
 */
export const renderPreloadTag = defineSsrRenderPreloadTag((file/* , { ssrContext } */) => {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}" crossorigin>`;
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif" crossorigin>`;
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg" crossorigin>`;
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png" crossorigin>`;
  }

  return '';
});
