# HotelHills Frontend

A modern, responsive hotel management system built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🏨 **Complete Hotel Management**: Rooms, guests, bookings, dining, and events
- 🎨 **Modern UI/UX**: Beautiful, responsive design with animations
- 📊 **Data Tables**: Sortable, searchable, and paginated data tables
- 🔄 **Real-time Updates**: Live data synchronization with backend
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized with Next.js 15

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API**: RESTful API integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running on port 5000

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Create environment file**:
   Create a `.env.local` file in the frontend directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.js         # Dashboard
│   │   ├── rooms/          # Room management
│   │   ├── guests/         # Guest management
│   │   ├── bookings/       # Booking management
│   │   └── ...            # Other modules
│   ├── components/         # Reusable components
│   │   └── DataTable.js   # Data table component
│   └── lib/               # Utilities and API
│       ├── api.js         # API service functions
│       └── utils.js       # Utility functions
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## Available Modules

1. **Room Management** (`/rooms`)

   - View all rooms
   - Add/edit/delete rooms
   - Room status tracking
   - Pricing management

2. **Guest Management** (`/guests`)

   - Guest profiles
   - Check-in/check-out
   - Contact information
   - Status tracking

3. **Booking Management** (`/bookings`)

   - Room reservations
   - Booking calendar
   - Guest assignments
   - Payment tracking

4. **Table Management** (`/tables`)

   - Restaurant tables
   - Seating arrangements
   - Capacity management

5. **Table Booking** (`/tableBookings`)

   - Restaurant reservations
   - Time slot management
   - Guest preferences

6. **KOT Management** (`/kots`)

   - Kitchen Order Tickets
   - Food service tracking
   - Order status

7. **Menu Management** (`/menu`)

   - Food items
   - Pricing
   - Categories
   - Availability

8. **Banquet Management** (`/banquets`)

   - Event spaces
   - Hall management
   - Capacity planning

9. **Banquet Booking** (`/banquetBookings`)

   - Event reservations
   - Catering services
   - Event planning

10. **Quotation Management** (`/quotations`)

    - Price quotes
    - Proposals
    - Client management

11. **Bill Management** (`/bills`)
    - Invoice generation
    - Payment tracking
    - Financial reports

## API Integration

The frontend connects to the backend via RESTful APIs. All API calls are centralized in `src/lib/api.js` with proper error handling and loading states.

### API Endpoints

- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

Similar endpoints exist for all other modules.

## Components

### DataTable Component

A reusable data table component with:

- Sorting functionality
- Search capabilities
- Pagination
- CRUD operations
- Loading states
- Error handling

### Usage Example

```jsx
import DataTable from "../components/DataTable";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  // ... more columns
];

<DataTable
  title="Users"
  data={users}
  columns={columns}
  loading={loading}
  onAdd={handleAdd}
  onEdit={handleEdit}
  onDelete={handleDelete}
  searchable={true}
  pagination={true}
/>;
```

## Styling

The project uses Tailwind CSS v4 with custom utilities and a consistent design system:

- **Colors**: Blue primary, green success, red danger, yellow warning
- **Spacing**: Consistent 4px grid system
- **Typography**: Geist font family
- **Animations**: Framer Motion for smooth transitions

## Development

### Adding New Modules

1. Create a new page in `src/app/[module-name]/page.js`
2. Add API functions in `src/lib/api.js`
3. Update the dashboard links in `src/app/page.js`
4. Add any new components to `src/components/`

### Customization

- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Layout**: Update `src/app/layout.js`
- **Components**: Extend existing components or create new ones

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Make sure to set the correct API URL for production:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
