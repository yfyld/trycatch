export const CACHE_TIME: number = 30000

export const GET_PROJECT_ALL_LIST_REQUEST = 'GET_PROJECT_ALL_LIST_REQUEST';
export const GET_PROJECT_ALL_LIST_SUCCESS = 'GET_PROJECT_ALL_LIST_SUCCESS';
export const GET_PROJECT_ALL_LIST_FAILURE = 'GET_PROJECT_ALL_LIST_FAILURE';
export type GET_PROJECT_ALL_LIST_REQUEST = typeof GET_PROJECT_ALL_LIST_REQUEST;
export type GET_PROJECT_ALL_LIST_SUCCESS = typeof GET_PROJECT_ALL_LIST_SUCCESS;
export type GET_PROJECT_ALL_LIST_FAILURE = typeof GET_PROJECT_ALL_LIST_FAILURE;

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export type LOGIN_REQUEST = typeof LOGIN_REQUEST
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS
export type LOGIN_FAILURE = typeof LOGIN_FAILURE

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export type LOGOUT_REQUEST = typeof LOGOUT_REQUEST
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS
export type LOGOUT_FAILURE = typeof LOGOUT_FAILURE


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export type SIGNUP_REQUEST = typeof SIGNUP_REQUEST
export type SIGNUP_SUCCESS = typeof SIGNUP_SUCCESS
export type SIGNUP_FAILURE = typeof SIGNUP_FAILURE

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST'
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE'
export type GET_USER_INFO_REQUEST = typeof GET_USER_INFO_REQUEST
export type GET_USER_INFO_SUCCESS = typeof GET_USER_INFO_SUCCESS
export type GET_USER_INFO_FAILURE = typeof GET_USER_INFO_FAILURE

export const GET_USER_LIST_REQUEST = 'GET_USER_LIST_REQUEST'
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS'
export const GET_USER_LIST_FAILURE = 'GET_USER_LIST_FAILURE'
export type GET_USER_LIST_REQUEST = typeof GET_USER_LIST_REQUEST
export type GET_USER_LIST_SUCCESS = typeof GET_USER_LIST_SUCCESS
export type GET_USER_LIST_FAILURE = typeof GET_USER_LIST_FAILURE



export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE'
export type UPDATE_USER_INFO_REQUEST = typeof UPDATE_USER_INFO_REQUEST
export type UPDATE_USER_INFO_SUCCESS = typeof UPDATE_USER_INFO_SUCCESS
export type UPDATE_USER_INFO_FAILURE = typeof UPDATE_USER_INFO_FAILURE

// project

export const GET_PROJECT_LIST_REQUEST = 'GET_PROJECT_LIST_REQUEST'
export const GET_PROJECT_LIST_SUCCESS = 'GET_PROJECT_LIST_SUCCESS'
export const GET_PROJECT_LIST_FAILURE = 'GET_PROJECT_LIST_FAILURE'
export type GET_PROJECT_LIST_REQUEST = typeof GET_PROJECT_LIST_REQUEST
export type GET_PROJECT_LIST_SUCCESS = typeof GET_PROJECT_LIST_SUCCESS
export type GET_PROJECT_LIST_FAILURE = typeof GET_PROJECT_LIST_FAILURE

export const GET_PROJECT_DETAILS_REQUEST = 'GET_PROJECT_DETAILS_REQUEST'
export const GET_PROJECT_DETAILS_SUCCESS = 'GET_PROJECT_DETAILS_SUCCESS'
export const GET_PROJECT_DETAILS_FAILURE = 'GET_PROJECT_DETAILS_FAILURE'
export type GET_PROJECT_DETAILS_REQUEST = typeof GET_PROJECT_DETAILS_REQUEST
export type GET_PROJECT_DETAILS_SUCCESS = typeof GET_PROJECT_DETAILS_SUCCESS
export type GET_PROJECT_DETAILS_FAILURE = typeof GET_PROJECT_DETAILS_FAILURE

export const UPDATE_PROJECT_DETAILS_REQUEST = 'UPDATE_PROJECT_DETAILS_REQUEST'
export const UPDATE_PROJECT_DETAILS_SUCCESS = 'UPDATE_PROJECT_DETAILS_SUCCESS'
export const UPDATE_PROJECT_DETAILS_FAILUER = 'UPDATE_PROJECT_DETAILS_FAILUER'
export type UPDATE_PROJECT_DETAILS_REQUEST = typeof UPDATE_PROJECT_DETAILS_REQUEST
export type UPDATE_PROJECT_DETAILS_SUCCESS = typeof UPDATE_PROJECT_DETAILS_SUCCESS
export type UPDATE_PROJECT_DETAILS_FAILUER = typeof UPDATE_PROJECT_DETAILS_FAILUER



export const ADD_PROJECT_TOGGLE = 'ADD_PROJECT_TOGGLE'
export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST'
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS'
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE'
export type ADD_PROJECT_TOGGLE = typeof ADD_PROJECT_TOGGLE
export type ADD_PROJECT_REQUEST = typeof ADD_PROJECT_REQUEST
export type ADD_PROJECT_SUCCESS = typeof ADD_PROJECT_SUCCESS
export type ADD_PROJECT_FAILURE = typeof ADD_PROJECT_FAILURE

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'
export type DELETE_PROJECT_REQUEST = typeof DELETE_PROJECT_REQUEST
export type DELETE_PROJECT_SUCCESS = typeof DELETE_PROJECT_SUCCESS
export type DELETE_PROJECT_FAILURE = typeof DELETE_PROJECT_FAILURE


export const GET_PROJECT_MEMBERS_REQUEST = 'GET_PROJECT_MEMBERS_REQUEST'
export const GET_PROJECT_MEMBERS_SUCCESS = 'GET_PROJECT_MEMBERS_SUCCESS'
export const GET_PROJECT_MEMBERS_FAILURE = 'GET_PROJECT_MEMBERS_FAILURE'
export type GET_PROJECT_MEMBERS_REQUEST = typeof GET_PROJECT_MEMBERS_REQUEST
export type GET_PROJECT_MEMBERS_SUCCESS = typeof GET_PROJECT_MEMBERS_SUCCESS
export type GET_PROJECT_MEMBERS_FAILURE = typeof GET_PROJECT_MEMBERS_FAILURE

export const ADD_PROJECT_MEMBER_TOGGLE = 'ADD_PROJECT_MEMBER_TOGGLE'
export type ADD_PROJECT_MEMBER_TOGGLE = typeof ADD_PROJECT_MEMBER_TOGGLE
export const ADD_PROJECT_MEMBER_REQUEST = 'ADD_PROJECT_MEMBER_REQUEST'
export const ADD_PROJECT_MEMBER_SUCCESS = 'ADD_PROJECT_MEMBER_SUCCESS'
export const ADD_PROJECT_MEMBER_FAILURE = 'ADD_PROJECT_MEMBER_FAILURE'
export type ADD_PROJECT_MEMBER_REQUEST = typeof ADD_PROJECT_MEMBER_REQUEST
export type ADD_PROJECT_MEMBER_SUCCESS = typeof ADD_PROJECT_MEMBER_SUCCESS
export type ADD_PROJECT_MEMBER_FAILURE = typeof ADD_PROJECT_MEMBER_FAILURE

export const SELECT_PROJECT_MEMBER = 'SELECT_PROJECT_MEMBER'
export type SELECT_PROJECT_MEMBER = typeof SELECT_PROJECT_MEMBER

export const DELETE_PROJECT_MEMBER_REQUEST = 'DELETE_PROJECT_MEMBER_REQUEST'
export const DELETE_PROJECT_MEMBER_SUCCESS = 'DELETE_PROJECT_MEMBER_SUCCESS'
export const DELETE_PROJECT_MEMBER_FAILURE = 'DELETE_PROJECT_MEMBER_FAILURE'
export type DELETE_PROJECT_MEMBER_REQUEST = typeof DELETE_PROJECT_MEMBER_REQUEST
export type DELETE_PROJECT_MEMBER_SUCCESS = typeof DELETE_PROJECT_MEMBER_SUCCESS
export type DELETE_PROJECT_MEMBER_FAILURE = typeof DELETE_PROJECT_MEMBER_FAILURE

export const PROJECT_FILE_UPLOAD_REQUEST = 'PROJECT_FILE_UPLOAD_REQUEST';
export const PROJECT_FILE_UPLOAD_SUCCESS = 'PROJECT_FILE_UPLOAD_SUCCESS';
export const PROJECT_FILE_UPLOAD_FAILURE = 'PROJECT_FILE_UPLOAD_FAILURE';
export type PROJECT_FILE_UPLOAD_REQUEST = typeof PROJECT_FILE_UPLOAD_REQUEST;
export type PROJECT_FILE_UPLOAD_SUCCESS = typeof PROJECT_FILE_UPLOAD_SUCCESS;
export type PROJECT_FILE_UPLOAD_FAILURE = typeof PROJECT_FILE_UPLOAD_FAILURE;

// work

export const GET_ERROR_LIST_REQUEST = 'GET_ERROR_LIST_REQUEST'
export const GET_ERROR_LIST_SUCCESS = 'GET_ERROR_LIST_SUCCESS'
export const GET_ERROR_LIST_FAILURE = 'GET_ERROR_LIST_FAILURE'
export type GET_ERROR_LIST_REQUEST = typeof GET_ERROR_LIST_REQUEST
export type GET_ERROR_LIST_SUCCESS = typeof GET_ERROR_LIST_SUCCESS
export type GET_ERROR_LIST_FAILURE = typeof GET_ERROR_LIST_FAILURE

export const GET_ERROR_CHART_REQUEST = 'GET_ERROR_CHART_REQUEST'
export const GET_ERROR_CHART_SUCCESS = 'GET_ERROR_CHART_SUCCESS'
export const GET_ERROR_CHART_FAILURE = 'GET_ERROR_CHART_FAILURE'
export type GET_ERROR_CHART_REQUEST = typeof GET_ERROR_CHART_REQUEST
export type GET_ERROR_CHART_SUCCESS = typeof GET_ERROR_CHART_SUCCESS
export type GET_ERROR_CHART_FAILURE = typeof GET_ERROR_CHART_FAILURE

export const GET_ERROR_ALL_DATA = 'GET_ERROR_ALL_DATA'
export type GET_ERROR_ALL_DATA = typeof GET_ERROR_ALL_DATA

export const ERROR_LIST_SELECTION_CHANGE = 'ERROR_LIST_SELECTION_CHANGE'
export type ERROR_LIST_SELECTION_CHANGE = typeof ERROR_LIST_SELECTION_CHANGE

export const ERROR_CHANGE = 'ERROR_CHANGE'
export type ERROR_CHANGE = typeof ERROR_CHANGE

export const GET_EVENT_CHART_DATA_REQUEST = 'GET_EVENT_CHART_DATA_REQUEST'
export const GET_EVENT_CHART_DATA_SUCCESS = 'GET_EVENT_CHART_DATA_SUCCESS'
export const GET_EVENT_CHART_DATA_FAILURE = 'GET_EVENT_CHART_DATA_FAILURE'
export type GET_EVENT_CHART_DATA_REQUEST = typeof GET_EVENT_CHART_DATA_REQUEST
export type GET_EVENT_CHART_DATA_SUCCESS = typeof GET_EVENT_CHART_DATA_SUCCESS
export type GET_EVENT_CHART_DATA_FAILURE = typeof GET_EVENT_CHART_DATA_FAILURE

export const SET_EVENT_ID = 'SET_EVENT_ID';
export type SET_EVENT_ID = typeof SET_EVENT_ID;

export const ERROR_STATUS = [
  {
    text: '未解决',
    color: 'red',
    value: 'UNSOLVED'
  },
  {
    text: '解决',
    color: 'green',
    value: 'SOLVED'
  },
  {
    text: '忽略',
    color: '#ccc',
    value: 'IGNORE'
  },
  {
    text: '处理中',
    color: 'orange',
    value: 'PROGRESS'
  }
]

export const ERROR_TYPE=[
  {
    text:"请求错误",
    value:"HTTP_ERROR"
  },
  {
    text:"JS错误",
    value:"JAVASCRIPT_ERROR"
  },
  {
    text:"VUE错误",
    value:"VUE_ERROR"
  },
  {
    text: "PROMISE错误",
    value: "PROMISE_ERROR"
  }
]

export const ERROR_LEVEL=[
  {
    text:"一级",
    color: 'blue',
    value:1
  },
  {
    text:"二级",
    color: 'orange',
    value:2
  },
  {
    text:"三级",
    color: 'red',
    value:3
  }
]


export const GET_EVENT_LIST_REQUEST = 'GET_EVENT_LIST_REQUEST'
export const GET_EVENT_LIST_SUCCESS = 'GET_EVENT_LIST_SUCCESS'
export const GET_EVENT_LIST_FAILURE = 'GET_EVENT_LIST_FAILURE'
export type GET_EVENT_LIST_REQUEST = typeof GET_EVENT_LIST_REQUEST
export type GET_EVENT_LIST_SUCCESS = typeof GET_EVENT_LIST_SUCCESS
export type GET_EVENT_LIST_FAILURE = typeof GET_EVENT_LIST_FAILURE



export const GET_EVENT_INFO_REQUEST = 'GET_EVENT_INFO_REQUEST'
export const GET_EVENT_INFO_SUCCESS = 'GET_EVENT_INFO_SUCCESS'
export const GET_EVENT_INFO_FAILURE = 'GET_EVENT_INFO_FAILURE'
export type GET_EVENT_INFO_REQUEST = typeof GET_EVENT_INFO_REQUEST
export type GET_EVENT_INFO_SUCCESS = typeof GET_EVENT_INFO_SUCCESS
export type GET_EVENT_INFO_FAILURE = typeof GET_EVENT_INFO_FAILURE


export const GET_ERROR_INFO_REQUEST = 'GET_ERROR_INFO_REQUEST'
export const GET_ERROR_INFO_SUCCESS = 'GET_ERROR_INFO_SUCCESS'
export const GET_ERROR_INFO_FAILURE = 'GET_ERROR_INFO_FAILURE'
export type GET_ERROR_INFO_REQUEST = typeof GET_ERROR_INFO_REQUEST
export type GET_ERROR_INFO_SUCCESS = typeof GET_ERROR_INFO_SUCCESS
export type GET_ERROR_INFO_FAILURE = typeof GET_ERROR_INFO_FAILURE


export const ADD_ERROR_REMARK = 'ADD_ERROR_REMARK'
export type ADD_ERROR_REMARK = typeof ADD_ERROR_REMARK
export const UPDATE_ERROR_REMARK = 'UPDATE_ERROR_REMARK'
export type UPDATE_ERROR_REMARK = typeof UPDATE_ERROR_REMARK
export const DELETE_ERROR_REMARK = 'DELETE_ERROR_REMARK'
export type DELETE_ERROR_REMARK = typeof DELETE_ERROR_REMARK
