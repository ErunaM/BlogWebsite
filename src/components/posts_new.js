import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {touched ? error : ''}
        </div>
      </div>
    );


  }

onSubmit(values)  {
  console.log(values);

  this.props.createPost(values, () => {
    this.props.history.push('/');
  });
}

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'sadas', categorys: 'asds', content: 'sda'}
  const errors = {};

  //Validate the inputs from 'values'
  if(!values.title){
    errors.title = "Enter a title!";
  }
  if(!values.tags){
    errors.tags = "Enter some categories";
  }
  if(!values.content){
    errors.content = "Enter some content please";
  }


  // if errors is empty, the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;


}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
