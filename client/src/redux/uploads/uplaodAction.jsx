
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const uploadProgress = (percentage) => ({
  type: UPLOAD_PROGRESS,
  payload: percentage,
});

export const uploadSuccess = (data) => ({
  type: UPLOAD_SUCCESS,
  payload: data,
});

export const uploadFailure = (error) => ({
  type: UPLOAD_FAILURE,
  payload: error,
});

