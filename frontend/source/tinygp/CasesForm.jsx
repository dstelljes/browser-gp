import React, { Fragment } from 'react'

export const CasesForm = function ({ onChange, value }) {
  const BoundInput = function ({ x, y }) {
    const handleChange = event => onChange(value.map((c, i) => i === x
      ? c.map((v, j) => j === y
        ? Number(event.target.value)
        : v)
      : c)
    )

    return (
      <input onChange={handleChange} type='number' step={0.1} value={value[x][y]} />
    )
  }

  const columns = Array(Math.max(0, ...value.map(c => c.length)))
    .fill()
    .map((_, i) => i)

  const addCase = () => () => {
    const n = Array(Math.max(2, columns.length)).fill(0)
    const r = [...value, n]

    onChange(r)
  }

  const addVariable = index => () => {
    const r = value
      .map(c => {
        c.splice(index, 0, 0)
        return c
      })

    onChange(r)
  }

  const removeCase = index => () => {
    const r = [...value]
    r.splice(index, 1)

    onChange(r)
  }

  const removeVariable = index => () => {
    const r = value
      .map(c => {
        c.splice(index, 1)
        return c
      })

    onChange(r)
  }

  return (
    <form>
      <table>
        <thead>
          <tr>
            {columns.slice(0, -1).map(i =>
              <Fragment key={i}>
                <th>
                  x<sub>{i}</sub>
                  <button disabled={columns.length < 3} onClick={removeVariable(i)}>
                    Remove variable
                  </button>
                </th>

                <th>
                  <button onClick={addVariable(i)}>
                    Add a new variable
                  </button>
                </th>
              </Fragment>
            )}

            {columns.slice(-1).map(i =>
              <th key={i}>
                y
              </th>
            )}

            <th />
          </tr>
        </thead>

        <tfoot>
          <tr>
            <th colSpan={columns.length * 2 + 1}>
              <button onClick={addCase()}>
                Add a new case
              </button>
            </th>
          </tr>
        </tfoot>

        <tbody>
          {value.map((c, i) =>
            <tr key={i}>
              {c.map((v, j) =>
                <Fragment key={j}>
                  <td>
                    <BoundInput x={i} y={j} />
                  </td>

                  <td />
                </Fragment>
              )}

              <td>
                <button disabled={value.length < 2} onClick={removeCase(i)}>
                  Remove case
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  )
}
