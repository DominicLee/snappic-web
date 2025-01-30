import {acceptHMRUpdate, defineStore} from 'pinia';
import {IRadioStream} from "src/models/interfaces";
import {deleteStream, getAllStreams, storeStream, updateStream} from "src/services/CommsService";

export const useStreamStore = defineStore('streamstore', {
  state: () => ({
    streams: [] as IRadioStream[],
  }),
  getters: {
    getAllStreams(state) {
      return state.streams;
    }
  },
  actions: {
    getStreamByUuid(uuid: string) {
      const foundStream: IRadioStream | undefined = this.streams.find((_stream: IRadioStream) => {
        return _stream.uuid === uuid
      })
      if (!foundStream) return `Couldn't find stream with uuid ${uuid}`
      return foundStream
    },
    async storeStream(stream: IRadioStream) {
      this.streams.push(stream);
      // Save to db
      await storeStream(stream);
    },
    async updateStream(uuid: string, property: any, value: string) {
      const foundStream: IRadioStream | undefined = this.streams.find((_stream: IRadioStream) => {
        return _stream.uuid === uuid
      })
      if (!foundStream) return `Couldn't find stream with uuid ${uuid}`
      // Update changed value
      foundStream[property] = value;
    },
    async deleteStream(_uuid: string) {
      const foundIndex: number = this.streams.findIndex((_stream: IRadioStream) => {
        return _stream.uuid === _uuid
      })
      if (foundIndex === -1 || foundIndex === undefined) return `Couldn't find stream with uuid ${_uuid}`
      if (this.streams[foundIndex]) {
        // Delete from db first
        await deleteStream(this.streams[foundIndex])
        // Then delete from store
        this.streams.splice(foundIndex, 1);
      }
    },
    async fetchStreamsFromServer() {
      const fetchedStreams = await getAllStreams();
      this.streams = fetchedStreams;
      return fetchedStreams;
    },
    async updateStreamOnServer(uuid: string) {
      const foundStream: IRadioStream | undefined = this.streams.find((_stream: IRadioStream) => {
        return _stream.uuid === uuid
      })
      console.log(foundStream);
      if (!foundStream) return `Couldn't find stream with uuid ${uuid}`
      // Update in db
      return await updateStream(foundStream);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStreamStore, import.meta.hot));
}
