import axios, {AxiosResponse} from "axios";
import {ENDPOINTS} from "src/abstract/Settings";
import {IRadioStream} from "src/models/interfaces";
import {handleError} from "src/helpers/ErrorHandler";

export const getAllStreams = async () => {
  // Here we fetch all the streams in the db
  return await axios.get(ENDPOINTS.FETCH_STREAMS, {}).then(async (response: AxiosResponse) => {
    return response.data;
  }).catch((error: AxiosResponse) => {
    handleError(`I was unable to fetch streams from the server. ${error.statusText}`)
  })
}

export const storeStream = async (_stream: IRadioStream) => {
  // Here we store a stream in the db
  return await axios.post(ENDPOINTS.SAVE_STREAM, {
    ..._stream
  }).then(async (response: AxiosResponse) => {
    return response.data;
  }).catch((error: AxiosResponse) => {
    handleError(`I was unable to store the stream on the sever. ${error.statusText}`)
  })
}

export const updateStream = async (_stream: IRadioStream) => {
  // Here we update a stream in the db
  return await axios.post(ENDPOINTS.UPDATE_STREAM, {
    ..._stream
  }).then(async (response: AxiosResponse) => {
    return response.data;
  }).catch((error: AxiosResponse) => {
    handleError(`I was unable to update the stream on the sever. ${error.statusText}`)
  })
}

export const deleteStream = async (_stream: IRadioStream) => {
  // Here we delete a stream from the db
  return await axios.post(ENDPOINTS.DELETE_STREAM, {uuid: _stream.uuid}).then(async (response: AxiosResponse) => {
    return response.data;
  }).catch((error: AxiosResponse) => {
    handleError(`I was unable to delete the stream on the sever. ${error.statusText}`)
  })
}
