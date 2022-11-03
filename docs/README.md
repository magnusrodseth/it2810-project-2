# Documentation

## About

The project is a single-page application (SPA) that presents data from a GitLab repository. React Router is used for rendering different views, providing the illusion that the website consists of multiple pages (but it really doesn't). Read more about the benefits about using React Router [here](https://www.split.io/blog/react-router-feature-flags/).

The [GitLab REST API](https://docs.gitlab.com/ee/api/api_resources.html) has been used to fetch data, and [Recharts](https://recharts.org/) has been used to visualize that data.

The line chart displays data about commits, whilst the bar chart displays data about issues.
The user can tune parameters to change how to data is visualized.
Please see the section **Content and functionality** below for more information.

The repository URL and access token is inputted by the user.

## Content and functionality

**The application has several page elements**.

**The application is responsive**. To achieve this, Tailwind's implementation of CSS breakpoints and media queries has been used. Read more about Tailwind's approach to responsive web design [here](https://tailwindcss.com/docs/responsive-design). Furthermore, a custom hook was created to dynamically scale the charts to ensure responsivity. Inspect the code [here](/src/hooks/charts/useChartDimensions.ts).

**The user can store the current color theme, repository URL and access token locally**. The color theme is stored in local storage, such that the website "remembers" the currently selected color theme across browser sessions. The repository URL and access token is stored in session storage, such that the user can refresh the website and not be signed out of the application. However, when exiting the browser tab, the data in session storage is cleared. Inspect the storage implementation [here](/src/lib/storage.ts).

**The data visualization is parameterized, allowing the user to choose what data to display**. Specifically, the user can filter the line chart in ways that can be combined together:

- **By contributor**. You can select a contributor to see that contributor's commits on a given date.
- **By date**. You can click and drag on the graph to select a date range.
- **With stats**. You can toggle whether to display extra stats in the tooltip when hovering over the graph.
- Click the **Reset** button to reset the graph.

## Technical requirements

### TypeScript

The application is implemented using TypeScript.

### React

The application uses React. Primarily, we have used functional components. To demonstrate the use of class components, please see the [`Footer` component](/src/components/layout/Footer.tsx).

### Directory and component structure

The code base has a sensible and opinionated directory and component structure.
Inspect the directories inside [`src`](/src/) to see this in detail.

### Application and component state

Conventional mechanisms like `useState`, `useEffect` and `props` are used to handle and manipulate the state of the application.

### React Context

React Context is used to handle the color theme, whether to display extra stats, and the currently selected contributor. Please see [`context`](/src/state/context.ts) and [`AppContextProvider`](/src/providers/AppContextProvider.tsx) for details on how this is implemented.

### Components

Custom React components are used together with components from the external library DaisyUI. For instance, the [`Button`](/src/components/common/Button.tsx) component is implemented by us, and uses the DaisyUI button under the hood. On the contrary, the [`Feedback`](/src/components/forms/Feedback.tsx) component is completely implemented by us, without using third-party components.

### Fetching data from GitLab

Data from GitLab is fetched using the third-party library [`axios`](https://github.com/axios/axios). The code for this is located in the [`api`](/src/api/) directory.

### HTML Web Storage

The application displays use of HTML Web Storage, specifically local storage and session storage. Local storage is used for storing the currently selected color theme. Session storage is used for storing the GitLab repository URL and personal access token. For more details, see the **Content and functionality** section above.

### Responsiveness

The application is responsive on multiple devices. This ranges from small mobile devices, with width of 320px, to increasingly larger devices. This breakpoint stems from Google Chrome DevTools' responsive mode. Both the line chart and bar chart are responsive. However, when using the bar chart on smaller devices, the labels on the x-axis in the bar chart are difficult to read. To fix this, we hide the labels on smaller devices, and display a custom tooltip when the user clicks on or hover over a bar in the bar chart.

#### Viewport

The [`Layout` component](/src/components/common/Layout.tsx) specifies that the height of the div should be equal to the screen. Furthermore, the [`Loading` component](/src/components/common/Loading.tsx) specifies the loading overlay to have width equal to the screen.

#### Media queries

Media queries are part of the `className` of the components in order to ensure responsivity. Read more about Tailwind's approach to responsive web design [here](https://tailwindcss.com/docs/responsive-design). Whenever you see `sm:`, `md:` or `lg:`, these are media queries in Tailwind.

#### Scalable images or content

There is no need for any images in the application, so there are no scalable images. However, we have ensured responsive charts using the custom hook [`useChartDimensions`](/src/hooks/charts/useChartDimensions.ts). This is the closest to a scalable image.

#### Adaptive and flexible layout

Flexbox is mainly used to ensure a flexible layout. Grid is used in the [`Loading` component](/src/components/common/Loading.tsx) in order to center it.

### Versions and dependencies

The correct version of Node (16.x) and `npm` (8.x) is used. See the `engines` attribute in [`package.json`](/package.json) to inspect this.

The application is created using Create React App.

The application uses React 18. See the `dependencies` attribute in [`package.json`](/package.json) to inspect this.

### Testing

#### Automated testing

The tests in the project is setup using [Jest with React Test Renderer](https://jestjs.io/docs/tutorial-react) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Most components have a corresponding snapshot test. Some components that handle user interaction have corresponding tests for their behavior, for instance [`LoginForm.test.tsx`](/src/components/forms/LoginForm.test.tsx).

#### Manual testing

The website has been tested for responsivity using Google Chrome DevTools responsive mode. On mobile and tablet, both vertical landscape orientation has been tested. Desktop has also been tested. The group has used Chrome's smallest breakpoint of 320px width as the smallest device tested. See the **Responsiveness** section for more information.

The various orientations and dimensions have also been tested for keeping intended functionality across different sizes. There is no loss of functionality as a consequence of different screen sizes and orientations.

### Git version control

Throughout the project lifecycle, tasks have been created as issues in GitLab with short-lived feature branches that resolve these issues. Commits have, to a large degree, been marked with the issue number they contribute to resolve. Additionally, all branches are marked with the issue number they resolve.

### Code etiquette and common conventions

The code base has an opinionated directory structure, separating different code in `components`, `hooks`, `lib`, `utils`, etc... These directories are again nested to allow for simpler filenames, components and functions that make sense in the context they are in. Code is documented using JSDoc where the group deems it necessary. Naming components, functions, types, etc... follow common convention: Components, types and interfaces are named using `PascalCase`, whilst functions and variables are named using `camelCase`. This is loosely based on [AirBnB's linting recommendation for React](https://github.com/airbnb/javascript/tree/master/react), a very popular style guide for React.
