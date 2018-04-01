import * as types from './action-types';

export const fetchingStage = () => ({
  type: types.FETCHING_SINGLE_STAGE
})

export const fetchingStageSuccess = (payload) => ({
  type: types.FETCHING_SINGLE_STAGE_SUCCESS,
  data: payload
})

export const fetchingStageFailure = () => ({
  type: types.FETCHING_SINGLE_STAGE_FAILURE
})

export const fetchingStages = (payload) => ({
  type: types.FETCHING_STAGES,
  data: payload
})

export const fetchingStagesSuccess = (payload) => ({
  type: types.FETCHING_STAGES_SUCCESS,
  data: payload
})

export const fetchingStagesFailure = () => ({
  type: types.FETCHING_STAGES_FAILURE
})

export const postingStage = () => ({
  type: types.POSTING_STAGE
})

export const postingStageSuccess = (payload) => ({
  type: types.POSTING_STAGE_SUCCESS,
  data: payload
})

export const postingStageFailure = () => ({
  type: types.POSTING_STAGE_FAILURE
})

export const deletingStage = () => ({
  type: types.DELETING_STAGE
})

export const deletingStageSuccess = (payload) => ({
  type: types.DELETING_STAGE_SUCCESS,
  data: payload
})

export const deletingStageFailure = () => ({
  type: types.DELETING_STAGE_FAILURE
})

export const editingStage = () => ({
  type: types.EDITING_STAGE
})

export const editingStageFinished = () => ({
  type: types.EDITING_STAGE_FINISHED
})
