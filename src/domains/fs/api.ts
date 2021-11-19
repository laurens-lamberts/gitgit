import RNFS from 'react-native-fs';
export const readFileSystem = async (): Promise<RNFS.ReadDirItem[] | null> => {
  let readResult: RNFS.ReadDirItem[] | null = null;
  await RNFS.readDir(RNFS.DocumentDirectoryPath + '/../')
    .then((result) => {
      if (result) {
        readResult = result;
      }
      // stat the first file
      console.log(result[0].name);
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      console.log(statResult);
      /* if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        } */

      return 'no file';
    })
    /* .then(contents => {
        // log the file contents
        console.log(contents);
      }) */
    .catch((err) => {
      console.log(err.message, err.code);
      alert(err);
    });
  return readResult;
};
