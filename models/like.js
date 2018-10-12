import {HTTP} from '../util/http.js';

class LikeModel extends HTTP {
  like(like_or_cancel, id, type) {
    let url = like_or_cancel === 'falseLike' ? 'like/cancel' : 'like';
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: id,
        type
      }
    })
  }

  getClassicLikeStatus(id, type, callback) {
    this.request({
      url: `classic/${type}/${id}/favor`,
      success: callback
    })
  }
}

export {LikeModel}