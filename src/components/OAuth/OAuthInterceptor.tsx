import { useEffect } from "react";

function paramsToObject(entries: IterableIterator<[string, string]>) {
  const result: { [key: string]: string } = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

const OAuthInterceptor = () => {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const urlParams = new URLSearchParams(window.location.search);
    const entries = urlParams.entries();
    const params = paramsToObject(entries);

    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage({
        params: JSON.parse(params.data),
        source: "qwitter-auth-redirect",
      });
      // close the popup
      window.close();
    }
  }, []);
  // some text to show the user
  return <p>Please wait...</p>;
};
export default OAuthInterceptor;
