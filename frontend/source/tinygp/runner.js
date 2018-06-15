import { Observable } from 'rxjs'

import { COMPLETION, GENERATION, INITIALIZATION } from './messages'
import Worker from 'worker-loader!./worker'

export const createRunner = function (cases = [], parameters = {}, seed = -1) {
  return Observable.create(observer => {
    const worker = new Worker('worker.js')

    worker.addEventListener('error', event => {
      observer.error(event)
    })

    worker.addEventListener('message', ({ data }) => {
      switch (data.type) {
        case COMPLETION:
          observer.complete()
          break

        case GENERATION:
          observer.next(data)
          break
      }
    })

    worker.postMessage({
      cases: cases,
      parameters: parameters,
      seed: seed,
      type: INITIALIZATION
    })

    return () => {
      worker.terminate()
    }
  })
}
