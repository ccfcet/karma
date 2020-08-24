# Queries

## Institution
```json
{
  entity(entityID){
    name
  }
}
```

## Departments/Batch/Clubs

```json
{
  entity(entityID){
    child(entityTypeID) {
      name
    }
  }
}
```

## People of role Faculty

```json
{
  role(roleID){
    people {
      name
    }
  }
}
```



## Faculties in DEP

```json
{
  entity(entityID) {
    role(roleID){
      people {
        name
      }
    }
  }
}
```

<!-- Change FK to Course from CourseInstance -->

## Department Courses

```json
{
  entity(entityID) {
    course {
      name
    }
  }
}
```
## Course'nte Department

```json
{
  course(courseID) {
    entity {
      name
    }
  }
}
```

## Permissions

role   permisions

fac1    [course]

type People{
    [permission-role] []
}
=>


person -> person-permission-role -> role-permission

a =  {
    Entities: [
      1: {
        'rw'
      }
    ],
    Course: [
      c1: {
        'r'
      }
    ],
    
  },

