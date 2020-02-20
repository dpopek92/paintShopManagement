import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Modal from 'components/molecules/modal/Modal';
import Buttons from 'templates/FlexRowTemplate';
import { setSpinner } from 'actions/view';
import { loadEmployees } from 'actions/employees';
import { addNewEmployee } from 'utils/apiHandlers/employees/post';
import { employeesPositions as positions, signal } from 'const/';
import { schema } from 'const/validateSchema/addEmployee';

const AddEmploye = ({ closeModal }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleValidate = values => {
  let errors = {};
  if (values.password2 !== values.password) {
   errors.password2 = 'Hasła muszą być identyczne';
  }
  if (!values.rodo) {
   errors.rodo = 'Zgoda jest wymagana';
  }
  if (!values.reg) {
   errors.reg = 'Zgoda jest wymagana';
  }
  if (values.positions.length === 0) {
   errors.positions = 'Wymagane zaznaczenie conajmniej jednego stanowiska';
  }
  //  console.log(errors);
  return errors;
 };
 return (
  <Modal closeModal={closeModal} title="Dodawanie pracownika">
   <Formik
    validationSchema={schema}
    validate={values => handleValidate(values)}
    onSubmit={async (values, actions) => {
     dispatch(setSpinner(true));
     const newEmployee = {
      firstname: values.firstname,
      surname: values.surname,
      email: values.email,
      password: values.password,
      positions: values.positions,
     };
     await addNewEmployee(
      newEmployee,
      () => {
       dispatch(
        loadEmployees(() => {
         dispatch(setSpinner(false));
         closeModal();
        }, signal.token),
       );
      },
      () => actions.setErrors({ email: 'Podany email jest już zajęty' }),
     );
    }}
    initialValues={{
     firstname: '',
     surname: '',
     company: '',
     email: '',
     password: '',
     password2: '',
     positions: [],
     rodo: '',
     reg: '',
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     isSubmitting,
     errors,
    }) => (
     <Form noValidate onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
       <Form.Control
        required
        type="text"
        name="firstname"
        value={values.firstname}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.firstname && !errors.firstname}
        placeholder="Imię*"
        className={errors.firstname && touched.firstname && 'is-invalid'}
       />
       {errors.firstname && touched.firstname && (
        <div className="invalid">{errors.firstname}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formSurname">
       <Form.Control
        required
        type="text"
        name="surname"
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.surname && !errors.surname}
        placeholder="Nazwisko*"
        className={errors.surname && touched.surname && 'is-invalid'}
       />
       {errors.surname && touched.surname && (
        <div className="invalid">{errors.surname}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formEmail">
       <Form.Control
        required
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.email && !errors.email}
        placeholder="Adres email*"
        className={errors.email && touched.email && 'is-invalid'}
       />
       {errors.email && touched.email && (
        <div className="invalid">{errors.email}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formPassword">
       <Form.Control
        required
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password && !errors.password}
        placeholder="Hasło*"
        className={errors.password && touched.password && 'is-invalid'}
       />
       {errors.password && touched.password && (
        <div className="invalid">{errors.password}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
       <Form.Control
        required
        type="password"
        name="password2"
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password2 && !errors.password2}
        placeholder="Powtórz hasło*"
        className={errors.password2 && touched.password2 && 'is-invalid'}
       />
       {errors.password2 && touched.password2 && (
        <div className="invalid">{errors.password2}</div>
       )}
      </Form.Group>

      <Form.Group controlId="positions">
       <Form.Label style={{ fontWeight: 'bold', fontSize: 18 }}>
        Stanowiska:
       </Form.Label>
       {positions.map(item => (
        <Form.Check
         key={item}
         type="checkbox"
         id={item}
         name={item}
         label={item}
         value={item}
         onChange={e => {
          if (e.target.checked) {
           values.positions.push(e.target.value);
          } else {
           values.positions = values.positions.filter(
            item => item !== e.target.value,
           );
          }
         }}
        />
       ))}
       {errors.positions && touched.positions && (
        <div className="invalid">{errors.positions}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formCheckboxRODO" className="checkbox__auth">
       <Form.Check
        type="checkbox"
        required
        name="rodo"
        style={{ fontSize: 9 }}
        onChange={handleChange}
        onBlur={handleBlur}
        label={
         <>
          <span>
           Wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę:
           BLOW Meble, NIP: 534 225 05 99, REGON: 144019841, w celu założenia i
           utrzymywania mojego konta użytkownika na warunkach opisanych w{' '}
          </span>
          <a href="/regulations">regulaminie</a>
          <span>
           {' '}
           i przy zachowaniu przepisów rozporządzenia o ochronie danych
           osobowych (RODO). Zostałem poinformowany, że zgodę mogę wycofać w
           dowolnym momencie. Zostałem poinformowany, że mam prawo wglądu,
           poprawiania oraz żądania usunięcia moich danych osobowych w dowolnej
           chwili. *
          </span>
         </>
        }
       />
       {errors.rodo && touched.rodo && (
        <div className="invalid">{errors.rodo}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formChecboxREG" className="checkbox__auth">
       <Form.Check
        type="checkbox"
        required
        name="reg"
        style={{ fontSize: 9 }}
        onChange={handleChange}
        onBlur={handleBlur}
        label={
         <>
          <span>Zapoznałem się z </span>
          <a href="/regulations">regulaminem. *</a>
         </>
        }
       />
       {errors.reg && touched.reg && (
        <div className="invalid">{errors.reg}</div>
       )}
      </Form.Group>

      <Form.Text className="text-muted text--required">
       * - pola wymagane
      </Form.Text>
      <hr />
      <Buttons justify="flex-end">
       <Button variant="success" type="submit">
        Dodaj
       </Button>
       <Button variant="danger" onClick={closeModal}>
        Anuluj
       </Button>
      </Buttons>
     </Form>
    )}
   />
  </Modal>
 );
};

AddEmploye.propTypes = {
 closeModal: PropTypes.func,
};

export default AddEmploye;
