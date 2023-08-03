export default function CreateAccount({
  params,
}: {
  params: { email: string };
}) {
  return <div>My Email: {decodeURIComponent(params.email)}</div>;
}
