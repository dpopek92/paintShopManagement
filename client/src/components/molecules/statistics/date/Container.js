import React from 'react';
import PropTypes from 'prop-types';
import Years from './Years';
import Months from './Months';
import Days from './Days';

const Container = ({ stats, view }) => {
 return (
  <div>
   <Years />
   <Months />
   {stats && <Days days={stats.days} view={view} />}
  </div>
 );
};

Container.propTypes = {
 stats: PropTypes.instanceOf(Object),
 view: PropTypes.oneOf(['production', 'employee']),
};

export default Container;
