import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from './api'
function Users({id}:{id:number}) {
    const {data:ApiData, isLoading, isError, error} = useQuery({
        queryKey:["users"],
        queryFn: ()=>fetchUsers(id),
        staleTime:2000
    })

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return<><div>Error fetching users</div>
        <p>{error?.toString()}</p>
        </> 
    }
  return (
    <div>{ApiData && ApiData?.map((item:any,index:number)=>{
        return (
            <div key={index}>
                <h3>{item.name}</h3>
                <p>{item.email}</p>
            </div>
        )
    })}</div>
  )
}

export default Users