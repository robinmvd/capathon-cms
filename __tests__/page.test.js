import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Home from '../src/app/page'

test('renders Home component', () => {
  const {container} = render(<Home />);
  expect(container).toBeInTheDocument();
})