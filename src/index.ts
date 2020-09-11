import { useEffect, useState } from "react";

const usePromiseLoader = <DataType>(
  dataFromProp: DataType | Promise<DataType>,
  defaultValue: DataType
): [DataType, boolean] => {
  const defaultDataState =
    dataFromProp instanceof Promise ? defaultValue : dataFromProp;

  const [data, setData] = useState<DataType>(defaultDataState);
  const [loading, setLoading] = useState<boolean>(
    dataFromProp instanceof Promise ? true : false
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (dataFromProp instanceof Promise) {
      dataFromProp
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => setError(error));
      return;
    }
    setData(data);
    setLoading(false);
  }, [dataFromProp]);

  if (error) {
    throw error;
  }

  return [data, loading];
};

export default usePromiseLoader;
