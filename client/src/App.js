import {useState, useEffect} from 'react'

async function request(url, method='GET', data = null) {
  try {
    const headers = {}
    let body

    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

function App() {
  const [categories, setCategories] = useState([])
  const [value, setValue] = useState('')
  
  async function fetchData() {
    const data = await request('http://localhost:5000/api/categories')
    setCategories(data)
  }
  
  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
  }

  async function createCategory() {
    const category = { name: value }
    const allCategories = categories.concat()

    const newCategory = await request('http://localhost:5000/api/categories', 'POST', category)
    allCategories.push(newCategory)
    setCategories(
      allCategories
    )
    setValue('')
  }

  function markCategory(id) {
    setCategories(
      categories.map(item => {
        if (item.id === id) {
          item.marked = true
        }
        return item
      })
    )
  }

  function removeCategory(id) {
    const newCategories = categories.concat().filter(item => item.id !== id)
    setCategories(
      newCategories
    )
  }

  return (
    <div className='container pt-4'>
      <h1>List of categories (Rest API)</h1>

      <form onSubmit={handleSubmit} className='mt-4 mb-4'>
        <div className='form-group d-flex align-items-center' style={{ gap: '0.5rem' }}>
          <label htmlFor='category'>Category name:</label>
          <input  
            id='category'
            style={{ width: '200px' }}
            className='form-control'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />

          <button type='submit' className='btn btn-primary' disabled={!value.trim()} onClick={() => createCategory()}>Create</button>
        </div>
      </form>

      <div className='d-flex flex-wrap align-items-center'>
        { 
          categories.length 
            ? (
              categories.map(item => {
                return (
                  <div className='d-inline-flex' key={item.id}>
                    <div className='card p-3 m-3 align-items-center'>
                      <h5 className={item.marked ? 'text-danger' : ''} style={{textTransform: 'capitalize'}}>{item.name}</h5>
                      <div className='d-flex gap-2'>
                        <button className={item.marked ? 'btn btn-light' : 'btn btn-secondary'} disabled={item.marked} onClick={() => markCategory(item.id)}>Mark</button>
                        <button className='btn btn-danger' onClick={() => removeCategory(item.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )
            : <p>No categories</p>
          }
      </div>
    </div>
  )
}

export default App
