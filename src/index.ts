import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (dataFromProp instanceof Promise) {
      dataFromProp.then((data) => {
        setData(data);
        setLoading(false);
      });
    }
  }, []);

  return [data, loading];
};

export default usePromiseLoader;
