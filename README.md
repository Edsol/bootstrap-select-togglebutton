bootstrap-select-togglebutton
=============================
Evolution of [bootstrap-select-togglebutton](https://github.com/wpic/bootstrap-select-togglebutton) by wpic.

Usage
=====

Create a select element and use the plugin, added compatiblity with [select2](https://github.com/select2/select2) jquery library.

`$('select').togglebutton();`


Options
=======

I've added two option: **select2** and **button.active_class**:

`{
    select2: true,
    button:{
      'active_class': 'active btn-checkbox-checked'
    }
  }`

**select2** true or false disable select2 element

**button.active_class** specifies the css class of selected button instead to use the default class
