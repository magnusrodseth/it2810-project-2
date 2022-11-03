const LineChartInformation = () => {
  return (
    <div>
      <p>
        The line chart displays information about the 100 most recent <strong>commits</strong> in the repository.
        By default, it displays the number of commits on a given date.
        You can filter the graph in two ways that can be combined together:
      </p>

      <ul className="my-6">
        <li>
          <strong>By contributor</strong>.
          You can select a contributor to see that contributor&apos;s commits on a given date.
        </li>
        <li>
          <strong>By date</strong>.
          You can click and drag on the graph to select a date range.
        </li>
        <li>
          <strong>With stats</strong>.
          You can toggle whether to display extra stats in the tooltip when hovering over the graph.
        </li>
        <li>
          Click the <strong>Reset</strong> button to reset the graph.
        </li>
      </ul>
    </div>
  )
}

export default LineChartInformation
