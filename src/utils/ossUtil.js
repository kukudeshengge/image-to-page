import IMGOSS from '@dm/img_oss';
let instance;

function SingleWrapper() {
    // const env = getLocal(LocalKeys.ENV || '');
    let BUCKET = 'juranapp-test';
    // if(['production','gray'].includes(env) || (typeof window !== 'undefined' && window.location.origin === 'https://chat.idongwo.com')){
    //     BUCKET = 'juranapp-prod'
    // }
    if (!instance) {
        instance = new IMGOSS(BUCKET, 'dm_edit_image');
    }
    return instance;
}
export const IMGCLIENT = SingleWrapper();
