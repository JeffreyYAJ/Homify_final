import os
import django
import requests
import random
from decimal import Decimal
from django.core.files.base import ContentFile
from datetime import timedelta
from faker import Faker

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rental_project.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.properties.models import Property, Address, Photo
from apps.amenities.models import Amenity
from apps.favorites.models import Favorite
from apps.chat.models import Message

User = get_user_model()
fake = Faker('fr_FR') # Use French locale for base, but we will mix in CM specific data

# --- CAMEROONIAN DATA ---
CM_CITIES = {
    'Yaoundé': ['Bastos', 'Odza', 'Biyem-Assi', 'Mendong', 'Ngousso', 'Santa Barbara', 'Mvan', 'Emana', 'Messassi', 'Tsinga'],
    'Douala': ['Bonapriso', 'Akwa', 'Bonanjo', 'Deido', 'Bepanda', 'Logpom', 'Kotto', 'Makepe', 'Denver', 'Bali'],
    'Buea': ['Molyko', 'Buea Town', 'Clerks Quarters', 'Federal Quarters', 'Great Soppo', 'Small Soppo'],
    'Limbe': ['Down Beach', 'Gardens', 'Mile 4', 'New Town'],
    'Bafoussam': ['Tamdja', 'Hausa', 'Banengo'],
    'Bamenda': ['Up Station', 'Commercial Avenue', 'Nkwen', 'Mankon']
}

CM_NAMES = {
    'first': ['Samuel', 'Roger', 'Thomas', 'Paul', 'Chantal', 'Marie', 'Jean', 'Pierre', 'Françoise', 'Yves', 'Alain', 'Therese', 'Joseph', 'Emmanuel', 'Rigobert', 'Patrick', 'Achille', 'Charlotte', 'Audrey'],
    'last': ['Etoua', 'Ngong', 'Nkono', 'Mabengue', 'Abessolo', 'Song', 'Étoundi', 'Bebongsu', 'Rayann', 'Wilfried', 'Atangana', 'Kenne', 'Yemtsa', 'Signe', 'Fongang', 'Momo', 'Awa', 'Magne']
}

CM_PHONE_PREFIXES = ['69', '67', '65', '68', '22', '23']

AMENITIES_LIST = [
    {'name': 'Wifi Haut Débit', 'category': 'CONNECTIVITY', 'icon': 'wifi'},
    {'name': 'Fibre Optique', 'category': 'CONNECTIVITY', 'icon': 'router'},
    {'name': 'Climatisation', 'category': 'COMFORT', 'icon': 'air-conditioner'},
    {'name': 'Ventilateur', 'category': 'COMFORT', 'icon': 'fan'},
    {'name': 'Parking Sécurisé', 'category': 'EXTERIOR', 'icon': 'parking'},
    {'name': 'Parking Couvert', 'category': 'EXTERIOR', 'icon': 'garage'},
    {'name': 'Gardien 24/7', 'category': 'SECURITY', 'icon': 'security'},
    {'name': 'Caméras de Surveillance', 'category': 'SECURITY', 'icon': 'cctv'},
    {'name': 'Barbelés Électrifiés', 'category': 'SECURITY', 'icon': 'fence'},
    {'name': 'Groupe Électrogène', 'category': 'COMFORT', 'icon': 'generator'},
    {'name': 'Panneaux Solaires', 'category': 'COMFORT', 'icon': 'solar-panel'},
    {'name': 'Forage', 'category': 'COMFORT', 'icon': 'water'},
    {'name': 'Citerne d\'eau', 'category': 'COMFORT', 'icon': 'water-tank'},
    {'name': 'Piscine', 'category': 'EXTERIOR', 'icon': 'pool'},
    {'name': 'Jardin', 'category': 'EXTERIOR', 'icon': 'tree'},
    {'name': 'Balcon', 'category': 'EXTERIOR', 'icon': 'balcony'},
    {'name': 'Terrasse', 'category': 'EXTERIOR', 'icon': 'terrace'},
    {'name': 'Vue sur Mer', 'category': 'EXTERIOR', 'icon': 'sea'},
    {'name': 'Salle de Sport', 'category': 'COMFORT', 'icon': 'dumbbell'},
    {'name': 'Ascenseur', 'category': 'COMFORT', 'icon': 'elevator'},
]

TYPE_CHOICES = ['HOUSE', 'APARTMENT', 'STUDIO', 'ROOM']

# Unsplash IDs categorized largely
IMAGE_IDS = [
    "photo-1522708323590-d24dbb6b0267", "photo-1502672260266-1c1ef2d93688", "photo-1600596542815-2250650d2bb3",
    "photo-1560448204-e02f11c3d0e2", "photo-1501183638710-841dd1904471", "photo-1512917774080-9991f1c4c750",
    "photo-1600585154340-be6161a56a0c", "photo-1580587771525-78b9dba3b91d", "photo-1554995207-c18c203602cb",
    "photo-1484154218962-a1c00208099f", "photo-1616486338812-3dadae4b4f9d", "photo-1616137466211-f939a420be63",
    "photo-1598228723793-52759bba239c", "photo-1586023492125-27b2c045efd7", "photo-1493663284031-b7e3aefcae8e",
    "photo-1524758631624-e2822e304c36", "photo-1560185127-6ed189bf02f4", "photo-1484154218962-a1c00208099f",
    "photo-1595246140625-573b715d11d3", "photo-1494526585095-c41746248156"
]

def generate_cm_phone():
    return f"{random.choice(CM_PHONE_PREFIXES)}{random.randint(1000000, 9999999)}"

def create_users(count=20):
    print(f"Creating {count} Users...")
    users = []
    
    # Ensure specific admin exists
    admin, _ = User.objects.get_or_create(email="admin@findhome.cm", defaults={
        "first_name": "Super", "last_name": "Admin", "role": "ADMIN", "is_superuser": True, "is_staff": True
    })
    if _: admin.set_password("admin123"); admin.save()
    users.append(admin)

    # Ensure specific landlord exists
    landlord, _ = User.objects.get_or_create(email="landlord@findhome.cm", defaults={
        "first_name": "Samuel", "last_name": "Eto'o", "role": "LANDLORD"
    })
    if _: landlord.set_password("securepass123"); landlord.save()
    users.append(landlord)

    for i in range(count):
        first = random.choice(CM_NAMES['first'])
        last = random.choice(CM_NAMES['last'])
        role = random.choice(['TENANT', 'LANDLORD'])
        email = f"{first.lower()}.{last.lower()}{i}@example.com"
        
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "first_name": first,
                "last_name": last,
                "role": role,
                "phone": generate_cm_phone(),
                "email_verified": True
            }
        )
        if created:
            user.set_password("password123")
            user.save()
            users.append(user)
    
    return users

def create_amenities():
    print("Creating Amenities...")
    created_amenities = []
    for data in AMENITIES_LIST:
        amenity, _ = Amenity.objects.get_or_create(
            name=data['name'],
            defaults={'category': data['category'], 'icon': data['icon']}
        )
        created_amenities.append(amenity)
    return created_amenities

def get_image_content(index):
    try:
        img_id = IMAGE_IDS[index % len(IMAGE_IDS)]
        url = f"https://images.unsplash.com/{img_id}?w=600&q=70" # Reduce size/quality for speed
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            return ContentFile(response.content, name=f"property_{index}.jpg")
    except:
        pass
    return None

def create_properties(users, amenities, count=20):
    print(f"Creating {count} Properties...")
    landlords = [u for u in users if u.role == 'LANDLORD']
    if not landlords: return []

    created_properties = []
    
    for i in range(count):
        city = random.choice(list(CM_CITIES.keys()))
        district = random.choice(CM_CITIES[city])
        prop_type = random.choice(TYPE_CHOICES)
        
        base_rent = {
            'STUDIO': (50000, 150000),
            'ROOM': (25000, 60000),
            'APARTMENT': (100000, 500000),
            'HOUSE': (300000, 1500000)
        }
        
        rent_range = base_rent[prop_type]
        rent = round(random.uniform(*rent_range) / 5000) * 5000 # Round to nearest 5000
        
        landlord = random.choice(landlords)
        
        title = f"{prop_type.capitalize()} à {district}"
        if random.random() > 0.5:
             adjectives = ["Magnifique", "Spacieux", "Moderne", "Luxueux", "Calme", "Bien situé"]
             title = f"{random.choice(adjectives)} {prop_type.capitalize()} - {district}"

        prop = Property.objects.create(
            landlord=landlord,
            title=title,
            description=fake.text(max_nb_chars=200),
            type=prop_type,
            surface=random.randint(15, 400),
            number_of_rooms=random.randint(1, 10),
            number_of_bedrooms=random.randint(1, 8),
            number_of_bathrooms=random.randint(1, 5),
            monthly_rent=Decimal(rent),
            agency_fees=Decimal(rent),
            deposit=Decimal(rent * 2),
            furnished=random.choice([True, False]),
            status='PUBLISHED'
        )
        
        Address.objects.create(
            property=prop,
            street_address=fake.street_address(),
            city=city,
            district=district,
            postal_code='00237',
            latitude=random.uniform(3.8, 3.9),
            longitude=random.uniform(11.5, 11.6)
        )
        
        prop.amenities.set(random.sample(amenities, k=random.randint(3, 8)))
        
        # Add primary photo
        image_file = get_image_content(i)
        if image_file:
            Photo.objects.create(property=prop, image=image_file, is_primary=True, order=0)
        
        created_properties.append(prop)
        print(f"Created property {i+1}/{count}: {title}")
        
    return created_properties

def create_favorites(users, properties, count=20):
    print(f"Creating Favorites...")
    # Just creating random favorites
    possible_pairs = [(u, p) for u in users for p in properties]
    selected_pairs = random.sample(possible_pairs, min(count, len(possible_pairs)))
    
    for user, prop in selected_pairs:
        Favorite.objects.get_or_create(user=user, property=prop)

def create_messages(users, properties, count=20):
    print(f"Creating Messages...")
    tenants = [u for u in users if u.role == 'TENANT']
    
    for i in range(count):
        tenant = random.choice(tenants)
        prop = random.choice(properties)
        landlord = prop.landlord
        
        if tenant == landlord: continue

        Message.objects.create(
            sender=tenant,
            recipient=landlord,
            property=prop,
            subject=f"Question sur {prop.title}",
            content=fake.paragraph(nb_sentences=3),
            is_read=random.choice([True, False])
        )

def main():
    try:
        users = create_users(25) # Total users
        amenities = create_amenities()
        properties = create_properties(users, amenities, 20)
        
        if properties:
            create_favorites(users, properties, 20)
            create_messages(users, properties, 20)
            
        print("\nDatabase population completed successfully!")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
