from .models import Category

# write django context processors


def categories(request):

    categories = Category.objects.all()

    return {"categories": categories}
