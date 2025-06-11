
# Backend Integration Guide

This document outlines the architecture prepared for backend integration.

## Architecture Overview

The codebase has been structured to support smooth transition from mock data to real backend APIs:

### 1. API Layer (`src/lib/api.ts`)
- `ApiClient` class with standard HTTP methods
- Automatic authentication token handling
- Centralized error handling
- TypeScript support for all requests/responses

### 2. Service Classes (`src/services/`)
- `DelegateService` - Handles all delegate-related API calls
- Organized by business domain
- Easy to extend with new endpoints

### 3. API Types (`src/types/api.ts`)
- Request/response type definitions
- Separate from UI types for flexibility
- Ready for backend contract validation

### 4. Data Hooks (`src/hooks/useApiDelegates.ts`)
- React Query integration for caching and state management
- Optimistic updates and cache invalidation
- Loading and error state handling

### 5. Unified Data Layer (`src/hooks/useUnifiedDelegates.ts`)
- Single interface for components
- Switches between mock and real data
- Maintains same API for components

### 6. Data Provider (`src/providers/DataProvider.tsx`)
- Controls mock vs real data usage
- Easy feature flag management

## Integration Steps

### Step 1: Environment Setup
Add these environment variables:
```bash
VITE_API_BASE_URL=https://your-api.com/api
VITE_USE_MOCK_DATA=false
VITE_DEBUG_API=true
```

### Step 2: Authentication
Update `src/lib/api.ts` to handle your authentication method:
- JWT tokens
- Session cookies
- API keys
- OAuth

### Step 3: Backend Contract
Ensure your backend APIs match the interfaces in:
- `src/types/api.ts` - Request/response types
- `src/services/delegateService.ts` - Endpoint definitions

### Step 4: Switch to Real Data
In your main app component, change:
```tsx
<DataProvider useMockData={false}>
  <App />
</DataProvider>
```

### Step 5: Update Components
Components using `useDelegates()` should switch to `useUnifiedDelegates()`:
```tsx
// Old
const { delegates, stats } = useDelegates()

// New
const { delegates, stats, isLoading, error } = useUnifiedDelegates(params)
```

## API Endpoints Expected

### Delegates
- `GET /api/delegates` - List delegates with pagination and filters
- `POST /api/delegates` - Create new delegate
- `GET /api/delegates/:id` - Get single delegate
- `PATCH /api/delegates/:id` - Update delegate
- `PATCH /api/delegates/:id/end-membership` - End membership
- `GET /api/delegates/stats` - Get statistics
- `GET /api/delegates/member-states` - Get member states list
- `GET /api/delegates/export` - Export delegates

### Documents
- `POST /api/delegates/documents` - Upload and attach document
- `GET /api/delegates/:id/documents` - Get delegate documents

### Notes
- `POST /api/delegates/notes` - Add note
- `PATCH /api/delegates/notes/:id` - Update note
- `DELETE /api/delegates/notes/:id` - Delete note

## Benefits of This Architecture

1. **Gradual Migration** - Switch between mock and real data easily
2. **Type Safety** - Full TypeScript support throughout
3. **Caching** - React Query handles caching and background updates
4. **Error Handling** - Centralized error management
5. **Testing** - Easy to mock services for testing
6. **Scalability** - Clean separation of concerns

## Next Steps

1. Set up your backend to match the expected API contract
2. Configure authentication in the ApiClient
3. Update environment variables
4. Test with real data
5. Remove mock data files when ready
