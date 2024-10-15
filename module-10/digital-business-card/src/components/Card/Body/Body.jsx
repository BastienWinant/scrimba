import React from "react"
import './Body.css'

function Body() {
  return (
    <div className="card-body">
      <section className="card-body-section">
        <h2 className="card-body-title">About</h2>
        <p className="card-body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum blanditiis accusamus doloribus impedit porro. Necessitatibus incidunt autem minus neque nostrum quis doloremque ex id, soluta tempore iste placeat ratione eveniet.</p>
      </section>
      <section className="card-body-section">
        <h2 className="card-body-title">Interests</h2>
        <p className="card-body-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur sequi tempora aliquid sed exercitationem itaque, mollitia quaerat id, libero in, impedit vitae pariatur veniam modi illo? Esse, nam libero!</p>
      </section>
    </div>
  )
}

export default Body