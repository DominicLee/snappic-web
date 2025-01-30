import axios, {AxiosResponse} from "axios";
import {ENDPOINTS} from "src/abstract/Settings";
import {IRadioStream} from "src/models/interfaces";

export const getAllStreams = async () => {
  // Here we fetch all the streams in the db
  return await axios.get(ENDPOINTS.FETCH_STREAMS, {}).then(async (response: AxiosResponse) => {
    return response.data;
  })
}

export const storeStream = async (_stream: IRadioStream) => {
  // Here we store a stream in the db
  return await axios.post(ENDPOINTS.SAVE_STREAM, {
    ..._stream
  }).then(async (response: AxiosResponse) => {
    return response.data;
  })
}

export const updateStream = async (_stream: IRadioStream) => {
  // Here we update a stream in the db
  return await axios.post(ENDPOINTS.UPDATE_STREAM, {
    ..._stream
  }).then(async (response: AxiosResponse) => {
    return response.data;
  })
}

export const deleteStream = async (_stream: IRadioStream) => {
  // Here we delete a stream from the db
  return await axios.post(ENDPOINTS.DELETE_STREAM, {uuid: _stream.uuid}).then(async (response: AxiosResponse) => {
    return response.data;
  })
}
