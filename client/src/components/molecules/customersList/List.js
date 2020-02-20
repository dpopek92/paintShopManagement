import React, { useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { getSortMethodForCustomers as getSortMethod } from 'utils/sort/getSortMethod';
import { sortByCompanyAsc } from 'utils/sort/sortMethods';
import { setSortList } from 'actions/view';
import ListRow from './ListRow';

const StyledTh = styled.th`
 cursor: pointer;
`;

const List = () => {
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);
 const sortBy = useSelector(state => state.view.sortList.customersList);

 const [sort, setSort] = useState({ sortBy: sortByCompanyAsc });

 //  SET SORT
 useEffect(() => {
  setSort({ sortBy: getSortMethod(sortBy) });
 }, [sortBy]);

 //  HANDLERS
 const handleSort = sortValue => {
  return sortBy === `by${sortValue}Desc`
   ? dispatch(setSortList('customersList', `by${sortValue}Asc`))
   : dispatch(setSortList('customersList', `by${sortValue}Desc`));
 };

 return (
  <Table responsive="lg" striped bordered hover size="sm">
   <thead>
    <tr>
     <th>LP</th>
     <StyledTh onClick={() => handleSort('Company')}>
      Firma <FontAwesomeIcon icon={faSort} />
     </StyledTh>
     <th>Zamawiający</th>
     <StyledTh onClick={() => handleSort('OrdersNumber')}>
      Ilość zamówień <FontAwesomeIcon icon={faSort} />
     </StyledTh>
    </tr>
   </thead>
   <tbody>
    {customers.sort(sort.sortBy).map((item, index) => (
     <ListRow item={item} index={index} key={item._id} />
    ))}
   </tbody>
  </Table>
 );
};

// List.propTypes = {};

export default List;
