import {Dialog} from 'quasar';

export const handleError = (errorMessage: string, callback?: Function) => {
    Dialog.create({
        title: 'Oops, something went wrong!',
        message: errorMessage,
    }).onOk(() => {
        callback && callback();
    });
}
