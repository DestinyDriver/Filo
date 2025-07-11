import FilePreviewClient from "../_components/FilePreviewClient";
export default function Page({ params }) {
  return <FilePreviewClient short_url={params.short_url} />;
}
