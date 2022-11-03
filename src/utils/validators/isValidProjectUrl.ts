import { VALID_PROJECT_URL } from '../../constants/api'

const isValidProjectUrl = (url: string) => url.startsWith(VALID_PROJECT_URL)

export default isValidProjectUrl
