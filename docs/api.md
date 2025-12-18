# API Documentation

## Endpoints

### POST /api/upload

Upload de arquivo de log.

**Request:**

- Content-Type: multipart/form-data
- Body: file (arquivo .log ou .txt)

**Response:**

```json
{
  "success": true,
  "fileId": "string",
  "logsCount": number
}
```

### GET /api/logs

Lista logs com filtros.

**Query Parameters:**

- `startDate`: ISO date string
- `endDate`: ISO date string
- `level`: string (info|warning|error|warn|debug)
- `component`: string
- `source`: string (NSX|HCX|ESXi|vCenter)
- `limit`: number
- `offset`: number

**Response:**

```json
{
  "logs": Log[],
  "total": number,
  "hasMore": boolean
}
```

### POST /api/parse

Parse de conteúdo de log.

**Request:**

```json
{
  "content": string,
  "source": string
}
```

**Response:**

```json
{
  "logs": Log[]
}
```
