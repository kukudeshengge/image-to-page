
// 生成短链  type  0 url 1 json
import { topicUrl } from '../config'
import { fetch } from './fetch'

export const getShortKey = (param) => fetch.post('/api_link/add', param);

// 获取小程序二维码链接
export const getMiniQrCode = async (scene, page) => {
  try {
    const data = await getShortKey({
      type: 1,
      data: scene,
    });
    const s = `s=${data.key}`;
    return `${topicUrl}/page/qrcode/wxapp?scene=${encodeURIComponent(s)}&page=${page}`;
  } catch (error) {
    return null;
  }
};
