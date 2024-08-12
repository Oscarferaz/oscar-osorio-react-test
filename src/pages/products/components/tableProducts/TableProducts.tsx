import { addProduct, deleteProduct } from "@/redux/states"
import { AppStore } from "@/redux/store"
import { getData } from "@/services/products/product"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, IconButton, Pagination, Table } from "rsuite"
import styles from './css/TableProducts.module.scss'
import { useNavigate } from "react-router-dom"
import { Product } from "@/models/product"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"



const { Column, HeaderCell, Cell } = Table

const defaultColumns = [
    {
        key: 'title',
        label: 'Nombre'
    },
    {
        key: 'price',
        label: 'Precio'
    },
]

interface ActionCellProps {
    dataKey: string
    onClick: (event: React.MouseEvent, rowData: Product) => void
    legend: string
    [key: string]: any
  }


const ActionCell: React.FC<ActionCellProps> = ({ rowData, dataKey, onClick, legend, ...props }) => {
    return (
      <Cell {...props} style={{ padding: '6px' }}>
        <Button
          appearance="link"
          onClick={(ev) => {
            onClick(ev, rowData)
          }}
        >
            {legend}
        </Button>
      </Cell>
    )
}

  

const TableProducts: React.FC = () => {


    const stateProducts = useSelector((store: AppStore) => store.products )
    
    const dispatch = useDispatch()
    const navigate = useNavigate() 

    const [sortColumn, setSortColumn] = useState<string | undefined>()
    const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")

    const [limit, ] = useState(2)
    const [page, setPage] = useState(1)

    const fecthData = async () => {
        try{
            const {data} = await getData()
            dispatch(addProduct([...stateProducts, {...data, id: String(data.id), price: String(data.price)}]))
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(stateProducts.length === 0) fecthData()
    }, [])

    const filterProducts = () => {
        return stateProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    const sortData = () => {
        let sortedData = filterProducts(); 
    
        if (sortColumn && sortType) {
            sortedData.sort((a, b) => {
                const x = a[sortColumn as keyof Product];
                const y = b[sortColumn as keyof Product];
    
                if (typeof x === 'number' && typeof y === 'number') {
                    return sortType === 'asc' ? x - y : y - x;
                }
    
                if (typeof x === 'string' && typeof y === 'string') {
                    return sortType === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
                }
    
                return 0;
            });
        }
    
        return sortedData;
    };
    

    const handleSortColumn = (dataKey: string, sortType?: 'asc' | 'desc') => {
        setLoading(true)
        setSortColumn(dataKey)
        setSortType(sortType)
        setLoading(false)
    }

    const paginatedData = sortData().slice((page - 1) * limit, page * limit)




    const totalPages = Math.ceil(sortData().length / limit)

    const handleRowClick = (rowData: any) => {
        navigate(`/products/${rowData.id}`) 
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleDeleteProduct = (event: React.MouseEvent, rowData: Product) => {
        event.stopPropagation()
        dispatch(deleteProduct(rowData.id))
    }
    
    const handleEditProduct = (event: React.MouseEvent, rowData: Product) => {
        event.stopPropagation()
        navigate(`/edit/${rowData.id}`)
    }

    return(
        <div className={styles.container}>
            <div className={styles.containerControls}>
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.filterProduct}
                />
                <IconButton icon={<FontAwesomeIcon icon={faPlus}/>} appearance="primary" onClick={() => navigate('/products/create')}/>
            </div>
        
            <Table
                data={paginatedData}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                className={styles.table}
                onRowClick={handleRowClick}
                height={400}
            >
                {
                    defaultColumns.map(column => {
                    const { key, label, ...rest } = column
                        return (
                        <Column fullText {...rest} key={key} sortable flexGrow={1}>
                                <HeaderCell>{label}</HeaderCell>
                                <Cell dataKey={key}/>
                        </Column>
                    )})
                }
                 <Column flexGrow={1}>
                    <HeaderCell>Editar</HeaderCell>
                    <ActionCell dataKey="id" onClick={handleEditProduct} legend={'Editar'}/>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Borrar</HeaderCell>
                    <ActionCell dataKey="id" onClick={handleDeleteProduct} legend={'Borrar'}/>
                </Column>

            </Table>

            <Pagination
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="xs"
                pages={totalPages}
                total={paginatedData.length}
                activePage={page}
                onChangePage={(page: number) => setPage(page)}
                className={styles.pagination}
            />
        </div>
    )
}

export default TableProducts