[![Build Status](https://travis-ci.org/Enrise/usePromiseLoader.svg?branch=master)](https://travis-ci.org/Enrise/usePromiseLoader)

# usePromiseLoader

In NextJs a page will only be rendered when everything in `getInitialProps` is loaded.
This hook will allow you to directly render and show a loader while the data is being loaded. Once the data is loaded the page will re-render and show the data.

## How to install

`npm install @enrise/usepromiseloader`

## How to use

```tsx
import usePromiseLoader from '@enrise/usepromiseloader'

type TestPageProps = {
  data: string
};

const TestPage: NextPage<TestPageProps> = ({ data }) => {
  const [resolvedData, loading] = usePromiseLoader(data, '');

  return (
    <div>
      {loading && 'loading...'}
      {!loading && resolvedData}
    </div>
  )
}

TestPage.getInitialProps = async () => {
  const data = process.browser ? getData() : await getData();
  return { data };
}
```

As you can see in the `getInitialProps` the promise from `getData` is directly returned when it is ran in a browser. The `usePromiseLoader` hook will make sure that the data is correctly loaded when the promise is resolved.
