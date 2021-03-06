import { Observable } from 'rxjs'

import { COMPLETION, GENERATION, INITIALIZATION } from './constants'
import Worker from './worker'

export const createRunner = function (cases = [], parameters = {}, seed = -1) {
  return Observable.create(observer => {
    const worker = new Worker()

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
