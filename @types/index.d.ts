export type ServicesExportType<K> = Promise<{
  data: K | null;
  error: string | null;
  message: string;
  statusCode: number;
}>;
