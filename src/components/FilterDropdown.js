import Form from 'react-bootstrap/Form';

const {Select} = Form;

export function FilterDropdown(props) {
    const {data} = props;
    const getUniqueCategoryProducts = (data) => {
        function onlyUnique(value, index, self) {
            return self.find(v => v.category === value.category).id === value.id;
        }

        return data.filter(onlyUnique);
    }

    const {setCurrentFilter} = props;
    const onChangeFilter = (e) => {
        setCurrentFilter(e.target.value);
    }
    const uniqueProducts = getUniqueCategoryProducts(data);

    return (
        <Select onChange={onChangeFilter} defaultValue={'all'}>
            <option value="all">all</option>
            {uniqueProducts.map((product) => {
                return <option key={product.category} value={product.category}>{product.category}</option>
            }) }
        </Select>
    );
}
