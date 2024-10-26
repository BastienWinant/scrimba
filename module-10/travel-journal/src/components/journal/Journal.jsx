import './Journal.css'

import Feed from './feed/Feed'
import Display from './display/Display'

export default function Journal(props) {
  return (
    <div className="journal">
      <Feed entries={props.entries} />
      <Display />
    </div>
  )
}