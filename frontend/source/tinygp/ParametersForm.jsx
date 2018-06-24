import React from 'react'

export const ParametersForm = function ({ onChange, value }) {
  const BoundInput = function({ min = -Infinity, max = Infinity, name, step = 1 }) {
    const handleChange = event => onChange({ ...value,
      [name]: Number(event.target.value)
    })
  
    return (
      <input onChange={handleChange} type='number' min={min} max={max} step={step} value={value[name]} />
    )
  }

  return (
    <form>
      <label>
        Constant count
        <BoundInput name={'constantCount'} min={0} max={100} />
      </label>

      <label>
        Constant minimum
        <BoundInput name={'constantMinimum'} />
      </label>

      <label>
        Constant maximum
        <BoundInput name={'constantMaximum'} />
      </label>

      <label>
        Crossover probability
        <BoundInput name={'crossoverProbability'} min={0} max={1} step={0.01} />
      </label>

      <label>
        Depth limit
        <BoundInput name={'depthLimit'} min={0} />
      </label>

      <label>
        Generation limit
        <BoundInput name={'generationLimit'} min={0} />
      </label>

      <label>
        Point mutation probability
        <BoundInput name={'mutationProbability'} min={0} max={1} step={0.01} />
      </label>

      <label>
        Population size
        <BoundInput name={'populationSize'} min={0} />
      </label>

      <label>
        Program length limit
        <BoundInput name={'lengthLimit'} min={0} />
      </label>

      <label>
        Tournament size
        <BoundInput name={'tournamentSize'} min={0} />
      </label>
    </form>
  )
}
