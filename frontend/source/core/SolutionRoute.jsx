import React from 'react'

import { PageTitle } from '../core/PageTitle'
import { CREATE_RUN, REPORT_GENERATION, SET_RUNNER_ACTIVE, SET_RUNNER_FAILED, SET_RUNNER_FINISHED, UPDATE_PARAMETERS } from '../data/actions'
import { ParametersForm } from '../tinygp/ParametersForm'
import { createRunner } from '../tinygp/runner'
import { connect } from '../utilities/router'

const mapDispatchToProps = dispatch => {
  return {
    createRun: solution => () => dispatch({
      solution: solution.id,
      type: CREATE_RUN
    }),
    startRunner: (solution, run, index) => () => {
      const subscription = createRunner([], run.parameters).subscribe(
        generation => dispatch({
          averageFitness: generation.averageFitness,
          averageLength: generation.averageLength,
          bestFitness: generation.bestFitness,
          run: index,
          solution: solution.id,
          type: REPORT_GENERATION
        }),
        error => dispatch({
          error: error,
          run: index,
          solution: solution.id,
          type: SET_RUNNER_FAILED
        }),
        () => dispatch({
          run: index,
          solution: solution.id,
          type: SET_RUNNER_FINISHED
        })
      )

      return dispatch({
        run: index,
        solution: solution.id,
        subscription: subscription,
        type: SET_RUNNER_ACTIVE
      })
    },
    updateParameters: (solution, run, index) => value => dispatch({
      run: index,
      solution: solution.id,
      type: UPDATE_PARAMETERS,
      value: value
    })
  }
}

const mapStateToProps = state => {
  return {
    solutions: state.solutions
  }
}

export const SolutionRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(function ({ createRun, match, solutions, startRunner, updateParameters }) {
  const solution = solutions.find(s => s.id === match.params.id)

  if (!solution) {
    return (
      <main>
        <PageTitle>Invalid solution</PageTitle>

        <p>
          The solution could not be loaded. (Currently, solutions don’t survive
          a reload.)
        </p>
      </main>
    )
  }

  switch (solution.engine) {
    case 'tinygp':
      return (
        <main>
          <PageTitle>
            {solution.name || 'Untitled solution'}
          </PageTitle>

          {solution.runs.map((run, index) =>
            <section key={index}>
              <h2>Run {index}</h2>

              <ParametersForm onChange={updateParameters(solution, run, index)} value={run.parameters} />

              <button onClick={startRunner(solution, run, index)}>
                Start run
              </button>

              {run.generations.map((generation, index) =>
                <div key={index}>
                  <h4>Generation {index}</h4>
                  <dl>
                    <dt>Average fitness</dt>
                    <dd>{generation.averageFitness}</dd>
                    <dt>Average length</dt>
                    <dd>{generation.averageLength}</dd>
                    <dt>Best fitness</dt>
                    <dd>{generation.bestFitness}</dd>
                  </dl>
                </div>
              )}
            </section>
          )}

          <button onClick={createRun(solution)}>
            Create a new run
          </button>
        </main>
      )

    default:
      return (
        <main>
          <PageTitle>Invalid solution</PageTitle>

          <p>
            This solution is a <strong>{solution.engine}</strong> solution,
            which isn’t supported by this app.
          </p>
        </main>
      )
  }
})
