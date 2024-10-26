import './Journal.css'

import Feed from './feed/Feed'

export default function Journal(props) {
  return (
    <div className="journal">
      <Feed entries={props.entries} />
    </div>
  )
}