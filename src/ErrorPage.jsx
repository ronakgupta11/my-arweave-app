import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex items-center flex-col justify-center mt-24">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-2xl color-gray-500">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}