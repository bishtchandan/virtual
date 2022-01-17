import React,{useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate'

function Post() {
    const [items, setItems] = useState([])
    useEffect(() => {
       const getData = async ()=>{
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`
            );
            const data = await res.json();
            setItems(data);
       };
       getData(); 
    }, [])
    const getData = async (currentPage)=>{
        const res = await fetch (
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
        )
        const data = await res.json();
        return(data);
    }
    const handlePageClick = async (data)=>{
        let currentPage = data.selected + 1
        const dataFromServer = await getData(currentPage);
        setItems(dataFromServer);
    };
    const [filter, setFilter] = useState('');
    const searchText = (event)=>{
        setFilter(event.target.value);
    }
    let dataSearch = items.filter(item=>{
        return Object.keys(item).some(key=>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })
    return (
        
        <div className="container ">

        <div className="row  d-flex justify-content-center">
        <div className="my-5 d-flex justify-content-center" style={{width: '25rem'}}>
        <form className="d-flex justify-content-center">
        <input className="form-control mb-2" onChange={searchText.bind(this)} value={filter} type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
        </div>
        </div>

        <div className="row my-5">
            {dataSearch.map((item)=>{
                return <div className="col-sm-6 col-md-4 my-4" key={item.id}>
                    <div className="card-shadow-sm w-100" style={{minHeight: 225}}>
                        <div className="card-body">
                            <h5 className="card-title text-center">Id: {item.id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted text-center">{item.title}</h6>
                            <p className="card-text text-center">{item.body}</p>
                        </div>
                    </div>
                </div>
            })}
            </div>

            <ReactPaginate
                previousLabel = {'previous'}
                nextLabel = {'next'}
                breakLabel = {'...'}
                pageCount = {10}
                marginPageDisplayed={2}
                pageRangeDisplayed = {3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center my-4'}
                PageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default Post
