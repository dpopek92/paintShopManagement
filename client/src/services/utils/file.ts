export const getFileExtension = (fileName: string) => {
 const fileNameArr = fileName.split('.');
 return fileNameArr[fileNameArr.length - 1];
};
