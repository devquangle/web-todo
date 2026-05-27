
export function ResponseSuccess(message, data) {
  return {
    success: true,
    message: message,
    data: data,
  };
}


export function ResponseError(message, data) {
  return {
    success: false,
    message: message,
    data: data,
  };
}