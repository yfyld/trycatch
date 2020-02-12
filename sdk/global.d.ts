interface HTMLElement {
  _trackerInfo: any
  _isWatchTrack: boolean
}

interface Element {
  content: string
}

interface XMLHttpRequest {
  oldOpen(method: string, url: string): void
  oldOpen(
    method: string,
    url: string,
    async: boolean,
    username?: string | null,
    password?: string | null
  ): void
  oldSend(body?: Document | BodyInit | null): void,
  oldError(this: XMLHttpRequest, ev: ProgressEvent): any
}

interface Window {
  CustomEvent: any,
  Event: any
}