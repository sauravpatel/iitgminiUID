# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a samples controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
## - call exposes all registered services (none by default)
#########################################################################


def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html

    if you need a simple wiki simple replace the two lines below with:
    return auth.wiki()
    """
    #response.flash = T("Welcome to our portal!")
    return dict(message=T('IITG Mini UID Project'))


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())



def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


@auth.requires_signature()
def data():
    """
    http://..../[app]/default/data/tables
    http://..../[app]/default/data/create/[table]
    http://..../[app]/default/data/read/[table]/[id]
    http://..../[app]/default/data/update/[table]/[id]
    http://..../[app]/default/data/delete/[table]/[id]
    http://..../[app]/default/data/select/[table]
    http://..../[app]/default/data/search/[table]
    but URLs must be signed, i.e. linked with
      A('table',_href=URL('data/tables',user_signature=True))
    or with the signed load operator
      LOAD('default','data.load',args='tables',ajax=True,user_signature=True)
    """
    return dict(form=crud())

#modified codes below

def selectType():
    form2 = SQLFORM.factory(SQLField('type', label='Select Your type',requires=IS_IN_SET(['student','faculty','staff','other'])), submit_button = 'Proceed to next step>>')
    if form2.process().accepted:
        session.flash = 'form accepted'
        redirect(URL(r=request,f='register', vars={'type':request.vars['type']}))
    elif form2.errors:
        response.flash = 'form has errors'
    else:
        response.flash = 'please fill the form1'
    return dict(form2=form2)

def register():
    #form2=SQLFORM.factory(dbUid.allResidents)
    #table = dbUid.student
    type = request.vars.type
    typeDict = {'student':dbUid.student,'faculty':dbUid.faculty,'staff':dbUid.staff,'other':dbUid.relationship}
    if type in typeDict:
        table = typeDict[type]
    else:
        redirect(URL(typeError))
    form2=SQLFORM.factory(dbUid.allResidents,table, keepvalues=True)
    #form2.vars['type']=type	#need to make this field readonly
    #if form2.process(onvalidation=generateUid).accepted:
    if form2.process().accepted:
        id = dbUid.allResidents.insert(**dbUid.allResidents._filter_fields(form2.vars))
        form2.vars.allResidents=id
        id = dbUid.student.insert(**table._filter_fields(form2.vars))
        response.flash='Thanks for filling the form2'
        redirect(URL('next'))
    elif form2.errors:
        response.flash = 'form2 has errors'
    else:
        if type in typeDict:
            table = typeDict[type]
        form2.vars['type']=type	#need to make this field readonly
        response.flash = 'please fill the form2'
    return dict(form2=form2)

# generate uid after all the field has been filled
# modify this function to support your format of the UIDs
def generateUid(form):
    form.vars.uid='123456789'

def type():
    return dict()
	
	
def next():
    return dict()
	
def typeError():
    return dict(message=T("Invalid Type selected"))