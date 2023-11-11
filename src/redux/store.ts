import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from './features/loginModal'
import uploadModalReducer from './features/uploadModal'
import loginReducer from './features/login'
import playerReducer from './features/player'

export const store = configureStore({
  reducer: {
    loginmodal:loginModalReducer,
    login:loginReducer,
    uploadModal:uploadModalReducer,
    player:playerReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch