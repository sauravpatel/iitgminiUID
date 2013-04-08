# controller for search

def index():
    field = getFieldList()
    userOptions = ['student', 'faculty', 'staff', 'others' ]
    form = SQLFORM.factory(
            Field( 'userOptions',widget=SQLFORM.widgets.checkboxes.widget, requires=[IS_IN_SET(userOptions, multiple=True), IS_NOT_EMPTY()] ), keepvalues=True)
    if form.process().accepted:
        redirect( URL( requestQuery, args=[form.vars['userOptions'][0] ] ) )
    #return dict( message = T( "Welcome to search" ) )
    return dict( message = field[0] , form=form)

def getFieldList():
    fields=['name','dob'];
    #response.flash( "Selecting fields." )
    return fields

def requestQuery():
    request.vars._formname = 'queryform'
    fields=['student.name', 'student.rollno', 'faculty.room', 'student.webmail']
    #form = SQLFORM.factory(
            #Field('where', 'string', notnull=True,requires=IS_IN_SET(fields)) )
    #if form.accepts(request.vars, formname='myform'):
        #return 'success'
    return dict(fields=fields)

def generateQuery():
    #name="saurav";
    #name = request.vars['where0'];
    #response.flash = T( str(name) );
    return dict()
